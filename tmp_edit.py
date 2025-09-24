from pathlib import Path

path = Path(r"src/app/page.tsx")
lines = path.read_text(encoding='utf-8').splitlines()
new_lines = []
inserted_wrapper = False
for line in lines:
    stripped = line.strip()
    if not inserted_wrapper and stripped == '<FlippingCard />':
        new_lines.append('        <div className="relative z-10">')
        new_lines.append('          <FlippingCard />')
        new_lines.append('        </div>')
        new_lines.append('')
        new_lines.append('      </section>')
        new_lines.append('')
        new_lines.append('      <div className="w-full max-w-6xl space-y-12 text-center mt-12">')
        inserted_wrapper = True
        continue
    if inserted_wrapper and stripped == '{/* Flipping Card */}':
        # skip original comment if it appears after we inserted wrapper (optional?)
        # Keep comment before? We'll keep comment by appending line.
        pass
    if stripped == '</section>' and inserted_wrapper:
        new_lines.append('      </div>')
        inserted_wrapper = False  # to prevent replacing other sections (though none exist)
        continue
    new_lines.append(line)

path.write_text('\n'.join(new_lines), encoding='utf-8')