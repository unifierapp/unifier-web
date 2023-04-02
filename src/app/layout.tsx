import {Inter} from 'next/font/google'
import './globals.css'

const interFont = Inter({
    subsets: ["latin"]
});

export const metadata = {
    title: "Converge",
    description: "Unified feeds for a connected world.",
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={interFont.className}>{children}</body>
        </html>
    )
}
