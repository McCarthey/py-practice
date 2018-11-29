const emojiRegex = require('emoji-regex')
const regex = emojiRegex()
const text = `
\u{231A}: ⌚ default emoji presentation character (Emoji_Presentation)
\u{2194}\u{FE0F}: ↔️ default text presentation character rendered as emoji
\u{1F469}: 👩 emoji modifier base (Emoji_Modifier_Base)
\u{1F469}\u{1F3FF}: 👩🏿 emoji modifier base followed by a modifier
`;
let match;
while (match = regex.exec(text)) {
	const emoji = match[0];
	console.log(`Matched sequence ${emoji} — code points: ${[...emoji].length}`);
}
