import os

path = r'c:\Users\izlet\claude\manolya-web\js\main.js'
with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    if 'html += \\<div style=\\"display:flex;' in line:
        skip = True
        new_lines.append('''    html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 15px; border-bottom: 1px solid #f0f0f0; padding-bottom: 15px;">
      <div style="display:flex; align-items:center; gap: 15px;">
        <img src="${item.image}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" alt="${item.name}">
        <div>
          <h4 style="margin:0 0 5px 0; font-size: 1rem;">${item.name}</h4>
          <div style="color: var(--color-primary); font-weight: 600;">${item.price} TL</div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap: 10px;">
        <button class="btn btn-outline btn-sm" style="padding: 2px 8px;" onclick="updateCartQuantity(${index}, -1)">-</button>
        <span>${item.quantity}</span>
        <button class="btn btn-outline btn-sm" style="padding: 2px 8px;" onclick="updateCartQuantity(${index}, 1)">+</button>
        <button class="btn btn-outline btn-sm" style="padding: 2px 8px; color: red; border-color: red;" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>`;\n''')
    elif '</div>\\;' in line:
        skip = False
        continue
    elif not skip:
        new_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
