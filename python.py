import tkinter as tk
from tkinter import ttk, font, messagebox
from PIL import Image, ImageDraw, ImageFont, ImageTk
import io
import os

# Silence macOS Tk deprecation warning
os.environ['TK_SILENCE_DEPRECATION'] = '1'

# Default base font size in pixels
DEFAULT_BASE_SIZE = 16

# Typography definitions from your CSS
typography = [
    ("h1", 3.0, 700, "Heading 1 - 3rem, weight 700"),
    ("h2", 2.25, 600, "Heading 2 - 2.25rem, weight 600"),
    ("h3", 1.75, 500, "Heading 3 - 1.75rem, weight 500"),
    ("h4", 1.375, 500, "Heading 4 - 1.375rem, weight 500"),
    ("h5", 1.125, 500, "Heading 5 - 1.125rem, weight 500"),
    ("p", 1.0, 400, "Paragraph - 1rem, weight 400"),
    ("a", 1.0, 400, "Link text - 1rem, weight 400"),
    ("li", 1.0, 400, "List item - 1rem, weight 400"),
    ("small", 0.875, 400, "Small text - 0.875rem"),
]

# Map weight number to font style string (for naming)
def weight_to_style(weight):
    if weight >= 700:
        return "bold"
    elif weight >= 600:
        return "semibold"
    elif weight >= 500:
        return "medium"
    else:
        return "normal"

class TypographyApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Typography Visualizer")
        self.root.geometry("900x700")

        # Variables
        self.base_size_var = tk.IntVar(value=DEFAULT_BASE_SIZE)
        self.font_family_var = tk.StringVar(value="Arial")

        # UI Setup
        self.setup_controls()
        self.setup_canvas()

        # Initial render
        self.render_typography()

    def setup_controls(self):
        control_frame = ttk.Frame(self.root)
        control_frame.pack(fill=tk.X, padx=10, pady=10)

        # Base font size control
        ttk.Label(control_frame, text="Base Font Size (px):").grid(row=0, column=0, sticky=tk.W)
        base_size_spin = ttk.Spinbox(control_frame, from_=8, to=72, increment=1,
                                     textvariable=self.base_size_var, width=5, command=self.render_typography)
        base_size_spin.grid(row=0, column=1, sticky=tk.W, padx=5)

        # Font family dropdown
        ttk.Label(control_frame, text="Font Family:").grid(row=0, column=2, sticky=tk.W, padx=(20, 0))
        fonts = sorted(set(font.families()))
        self.font_combo = ttk.Combobox(control_frame, textvariable=self.font_family_var, values=fonts, width=20)
        self.font_combo.grid(row=0, column=3, sticky=tk.W, padx=5)
        self.font_combo.bind("<<ComboboxSelected>>", lambda e: self.render_typography())

        # Refresh button
        refresh_btn = ttk.Button(control_frame, text="Refresh", command=self.render_typography)
        refresh_btn.grid(row=0, column=4, padx=10)

        # Export button
        export_btn = ttk.Button(control_frame, text="Export PNG", command=self.export_image)
        export_btn.grid(row=0, column=5, padx=5)

    def setup_canvas(self):
        # Create frame for canvas and scrollbar
        canvas_frame = ttk.Frame(self.root)
        canvas_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        # Canvas with scrollbar
        self.canvas = tk.Canvas(canvas_frame, bg="white")
        scrollbar = ttk.Scrollbar(canvas_frame, orient="vertical", command=self.canvas.yview)
        self.canvas.configure(yscrollcommand=scrollbar.set)

        self.canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

    def get_macos_font_path(self, family, style):
        """Get macOS system font path"""
        # macOS font directories
        macos_font_paths = [
            '/System/Library/Fonts/',
            '/Library/Fonts/',
            os.path.expanduser('~/Library/Fonts/')
        ]
        
        # macOS font file mappings
        macos_fonts = {
            'arial': {
                'normal': ['Arial.ttf', 'Arial.ttc'],
                'bold': ['Arial Bold.ttf', 'Arial-BoldMT.ttf']
            },
            'helvetica': {
                'normal': ['Helvetica.ttc', 'HelveticaNeue.ttc'],
                'bold': ['Helvetica-Bold.ttc', 'HelveticaNeue-Bold.ttf']
            },
            'times': {
                'normal': ['Times.ttc', 'Times New Roman.ttf'],
                'bold': ['Times-Bold.ttc', 'Times New Roman Bold.ttf']
            },
            'courier': {
                'normal': ['Courier.ttc', 'Courier New.ttf'],
                'bold': ['Courier-Bold.ttc', 'Courier New Bold.ttf']
            },
            'georgia': {
                'normal': ['Georgia.ttf'],
                'bold': ['Georgia Bold.ttf']
            },
            'verdana': {
                'normal': ['Verdana.ttf'],
                'bold': ['Verdana Bold.ttf']
            }
        }
        
        family_lower = family.lower()
        weight = 'bold' if style == 'bold' else 'normal'
        
        # Try each macOS font directory
        for font_dir in macos_font_paths:
            if os.path.exists(font_dir):
                # First try specific font mappings
                for font_key, variants in macos_fonts.items():
                    if font_key in family_lower:
                        if weight in variants:
                            for filename in variants[weight]:
                                full_path = os.path.join(font_dir, filename)
                                if os.path.exists(full_path):
                                    return full_path
                
                # Then try direct filename matching
                try:
                    for filename in os.listdir(font_dir):
                        if filename.lower().endswith(('.ttf', '.ttc', '.otf')):
                            # Match family name in filename
                            if family_lower in filename.lower():
                                # Check if it matches the weight we want
                                filename_lower = filename.lower()
                                if weight == 'bold' and 'bold' in filename_lower:
                                    return os.path.join(font_dir, filename)
                                elif weight == 'normal' and 'bold' not in filename_lower:
                                    return os.path.join(font_dir, filename)
                except PermissionError:
                    # Some system directories might not be readable
                    continue
        
        raise IOError(f"Font file not found for {family} {style} on macOS")

    def render_typography(self):
        base_size = self.base_size_var.get()
        font_family = self.font_family_var.get()

        # Create blank white image
        img_width = 850
        line_height = int(base_size * 2.8)
        img_height = line_height * len(typography) + 40
        image = Image.new("RGB", (img_width, img_height), "white")
        draw = ImageDraw.Draw(image)

        y = 20

        for tag, rem_size, weight_num, label in typography:
            font_size = int(rem_size * base_size)
            style = weight_to_style(weight_num)

            # Try to load the font with multiple fallbacks
            pil_font = None
            
            # First try: macOS system font path
            try:
                font_path = self.get_macos_font_path(font_family, style)
                pil_font = ImageFont.truetype(font_path, font_size)
            except:
                pass
            
            # Second try: just font family name (works on some systems)
            if pil_font is None:
                try:
                    pil_font = ImageFont.truetype(font_family, font_size)
                except:
                    pass
            
            # Third try: common macOS system fonts
            if pil_font is None:
                common_macos_fonts = [
                    '/System/Library/Fonts/Arial.ttf',
                    '/System/Library/Fonts/Helvetica.ttc', 
                    '/System/Library/Fonts/Times.ttc',
                    '/System/Library/Fonts/Courier.ttc'
                ]
                for font_path in common_macos_fonts:
                    try:
                        if os.path.exists(font_path):
                            pil_font = ImageFont.truetype(font_path, font_size)
                            break
                    except:
                        continue
            
            # Final fallback: default PIL font (scaled)
            if pil_font is None:
                try:
                    pil_font = ImageFont.load_default()
                except:
                    # If even default fails, we'll skip this item
                    continue

            # Draw label with macOS system font
            label_font_size = max(10, int(base_size * 0.7))
            try:
                label_font = ImageFont.truetype(self.get_macos_font_path(font_family, "normal"), label_font_size)
            except:
                try:
                    # Fallback to Arial on macOS
                    if os.path.exists('/System/Library/Fonts/Arial.ttf'):
                        label_font = ImageFont.truetype('/System/Library/Fonts/Arial.ttf', label_font_size)
                    else:
                        label_font = ImageFont.load_default()
                except:
                    label_font = ImageFont.load_default()

            # Draw the label and sample text
            draw.text((20, y), label, fill="#666666", font=label_font)
            sample_text = f"Sample text for {tag}"
            draw.text((320, y), sample_text, fill="#000000", font=pil_font)
            
            y += line_height

        # Store image for export
        self.current_image = image

        # Convert PIL image to Tkinter PhotoImage
        self.tk_image = ImageTk.PhotoImage(image)
        
        # Update canvas
        self.canvas.delete("all")
        self.canvas.create_image(10, 10, anchor=tk.NW, image=self.tk_image)
        self.canvas.configure(scrollregion=self.canvas.bbox("all"))

    def export_image(self):
        """Export current typography sample as PNG"""
        if hasattr(self, 'current_image'):
            try:
                filename = f"typography_samples_{self.font_family_var.get()}_{self.base_size_var.get()}px.png"
                self.current_image.save(filename)
                messagebox.showinfo("Export Successful", f"Image saved as {filename}")
            except Exception as e:
                messagebox.showerror("Export Failed", f"Failed to save image: {str(e)}")
        else:
            messagebox.showwarning("No Image", "No image to export. Please generate typography first.")

def main():
    root = tk.Tk()
    app = TypographyApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()