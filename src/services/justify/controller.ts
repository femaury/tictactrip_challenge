
const MAX_LINE_CHARS = 80;

export const justifyText = (text: string) => {
    
    let count = 0;
    let justifiedStrings: string[][] = [[]];
    let line = 0;
    const words = text.replace(/^ +/gm, "").replace(/^\s*[\r\n]/gm, "") .split(' ');

    words.forEach(w => {
        count += w.length;
        // Add 1 space char for every word to count
        if (justifiedStrings[line].length + count > MAX_LINE_CHARS || w.includes("\n")) {
            line++;
            justifiedStrings.push([])
            count = w.length - (w.includes("\n") ? 1 : 0);
        }
        justifiedStrings[line].push(w.replace("\n", ""));
    })

    let justifiedText: string[] = [];
    justifiedStrings.forEach((s, i) => {
        const line = s.join(" ");

        if (line.length < MAX_LINE_CHARS && i < justifiedStrings.length - 1) {
            if (s.length === 1) {
                justifiedText.push(s[0] + ' '.repeat(MAX_LINE_CHARS - s[0].length))
            } else {
                const wordsToPad = s.length - 1;
                const current = s.reduce((t, w) => t + w.length, 0)
                const extras = MAX_LINE_CHARS - current;
                const spaceBetween = Math.floor(extras / wordsToPad);
                const spacer = ' '.repeat(spaceBetween);
                const extraSpaces = extras - spaceBetween * wordsToPad;
                const leftExtraSpaces = Math.ceil(extraSpaces / 2);
                const rightExtraSpaces = Math.floor(extraSpaces / 2);

                let paddedWords = s.slice(1).map((w, i) => 
                    spacer + (i < leftExtraSpaces ? ' ' : '') + w 
                );
                paddedWords = paddedWords.reverse().map((w, i) => 
                    (i < rightExtraSpaces ? ' ' : '') + w
                ).reverse();
                
                const justifiedLine = [s[0], ...paddedWords].join('');
                justifiedText.push(justifiedLine);
            }
        } else {
            justifiedText.push(line);
        }
    })
    return justifiedText.join("\n");
}