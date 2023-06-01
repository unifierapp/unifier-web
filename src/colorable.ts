const path = require('path');
const fs = require('fs');

async function main() {
    await fs.promises.mkdir('./icons/providers', {
        recursive: true
    });
    const files = await fs.promises.readdir('./icons/providers');

    for (const file of files) {
        if (file.endsWith('.svg')) {
            const data = (await fs.promises.readFile(path.join('./icons/providers', file))).toString();
            const newData = data
                .replaceAll(/(['"])#[0-9A-F]{6}\1/gi, '"currentColor"')
                .replaceAll(/fill=(['"])[a-z]+\1/gi, 'fill="currentColor"')
                .replaceAll(/stroke=(['"])[a-z]+\1/gi, 'fill="currentColor"');

            const oldFilenameTerms = file.split(/\s+/);
            const newFilename = oldFilenameTerms.map((term: string) => {
                return term.toLowerCase();
            }).join("-");

            await fs.promises.writeFile(path.join('./icons/providers', newFilename), newData);
        }
    }
}

main().then();
