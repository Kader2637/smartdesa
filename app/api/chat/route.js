import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { message } = await request.json();

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'system',
                        content: `Kamu adalah Asisten Virtual resmi dari platform "Smart Desa Nusantara". 

TUGAS UTAMA:
Arahkan warga untuk menggunakan fitur online di website ini (Layanan Desa, Pelaporan Warga, Pasar UMKM). Jangan suruh ke balai desa jika bisa online!

ATURAN FORMAT BALASAN (SANGAT PENTING & WAJIB DIIKUTI):
1. WAJIB pisahkan setiap paragraf dengan ENTER (baris baru).
2. Jika membuat daftar atau langkah-langkah (1, 2, 3), WAJIB tekan ENTER untuk setiap nomornya agar menurun ke bawah! JANGAN PERNAH menyambung nomor 1, 2, dan 3 dalam satu baris!
3. Gunakan huruf tebal (**teks**) untuk nama menu.
4. Gunakan EMOJI yang sesuai.

Contoh format yang BENAR:
Paragraf pembuka...

1. Langkah pertama...
2. Langkah kedua...
3. Langkah ketiga...

Paragraf penutup...`
                    },
                    { role: 'user', content: message }
                ],
                temperature: 0.5,
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: 'Gagal dari Groq' }, { status: 500 });
        }

        return NextResponse.json({ reply: data.choices[0].message.content });

    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}