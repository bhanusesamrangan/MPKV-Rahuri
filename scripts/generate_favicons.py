import os
from PIL import Image

logo_path = 'public/media/logos/Logo.png'
img = Image.open(logo_path).convert('RGBA')

destinations = [
    'public',
    'web/public',
    'admin/public',
    'web/src/app'
]

# Generate multi-size ICO
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]

for dest in destinations:
    os.makedirs(dest, exist_ok=True)
    
    # Save .ico
    ico_dest = os.path.join(dest, 'favicon.ico')
    img.save(ico_dest, format='ICO', sizes=ico_sizes)
    print(f"Generated {ico_dest}")

    # Save 32x32 favicon.png
    f32 = img.resize((32, 32), Image.Resampling.LANCZOS)
    f32_path = os.path.join(dest, 'favicon.png')
    f32.save(f32_path, format='PNG')
    print(f"Generated {f32_path}")

    # Save 192x192 icon.png
    f192 = img.resize((192, 192), Image.Resampling.LANCZOS)
    f192_path = os.path.join(dest, 'icon.png')
    f192.save(f192_path, format='PNG')
    print(f"Generated {f192_path}")

    # Save 180x180 apple-touch-icon.png
    f180 = img.resize((180, 180), Image.Resampling.LANCZOS)
    f180_path = os.path.join(dest, 'apple-touch-icon.png')
    f180.save(f180_path, format='PNG')
    print(f"Generated {f180_path}")

# Specifically for Next.js app directory conventions
next_app_apple = 'web/src/app/apple-icon.png'
img.resize((180, 180), Image.Resampling.LANCZOS).save(next_app_apple, format='PNG')
print(f"Generated {next_app_apple}")

# Also ensure Logo.png is in web/public and admin/public root as /Logo.png
for dest in ['web/public', 'admin/public', 'public']:
    img.save(os.path.join(dest, 'Logo.png'), format='PNG')
    print(f"Copied Logo.png to {dest}/Logo.png")

print("All favicon assets generated successfully!")
