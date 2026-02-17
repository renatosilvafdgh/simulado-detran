---
description: Gerar Post Automático do Word
---

import json
from docx import Document
from slugify import slugify
from supabase import create_client
from datetime import datetime

# 🔧 COLE AQUI APENAS SUPABASE
SUPABASE_URL = "COLE_AQUI_SUA_SUPABASE_URL"
SUPABASE_KEY = "COLE_AQUI_SUA_SERVICE_ROLE_KEY"

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


def gerar_post_do_word(file_path, meta_title, meta_description, hashtags, excerpt, autor="Lucas Pinto"):

    doc = Document(file_path)

    title = doc.paragraphs[0].text.strip()
    content = "\n".join([p.text.strip() for p in doc.paragraphs[1:] if p.text.strip()])

    slug = slugify(title)

    # Evita slug duplicado
    existing = supabase.table("posts").select("id").eq("slug", slug).execute()
    if existing.data:
        slug = f"{slug}-{datetime.now().strftime('%H%M%S')}"

    supabase.table("posts").insert({
        "title": title,
        "slug": slug,
        "content": content,
        "meta_title": meta_title[:60],
        "meta_description": meta_description[:155],
        "excerpt": excerpt,
        "hashtags": hashtags,
        "published_at": datetime.utcnow().isoformat(),
        "author": autor,
        "status": "published"
    }).execute()

    print(f"✅ Post criado com sucesso! Slug: {slug}")
    return slug
