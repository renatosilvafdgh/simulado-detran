---
description: Gerar Post Automático do Word
---

from docx import Document
import slugify
import openai
from supabase import create_client
from datetime import datetime

# Configurações do Supabase
SUPABASE_URL = "https://seusupabaseurl.supabase.co"
SUPABASE_KEY = "sua_chave_supabase"
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Função para gerar campos via IA se estiverem faltando
def gerar_campo_ia(texto_base, campo):
    prompt = f"Crie {campo} para um post de blog com base no texto abaixo:\n\n{texto_base}"
    response = openai.ChatCompletion.create(
        model="gpt-5-mini",
        messages=[{"role":"user", "content":prompt}]
    )
    return response['choices'][0]['message']['content'].strip()

# Função para gerar imagem via IA
def gerar_imagem(title):
    prompt = f"Crie uma imagem ilustrativa para um post de blog com o título: {title}"
    # Aqui você chamaria sua API de geração de imagens
    return "https://link-da-imagem-gerada.com/imagem.png"

# Função principal do workflow
def gerar_post_do_word(file_path, autor="Lucas Pinto"):
    # Ler Word
    doc = Document(file_path)
    
    # Extrair título e conteúdo
    title = doc.paragraphs[0].text
    content = "\n".join([p.text for p in doc.paragraphs[1:]])
    
    # Criar slug
    slug = slugify.slugify(title)
    
    # Gerar campos faltantes via IA
    meta_title = gerar_campo_ia(content, "um meta title SEO")[:60]
    meta_description = gerar_campo_ia(content, "uma meta description SEO")[:160]
    hashtags = gerar_campo_ia(content, "hashtags separadas por vírgula")
    
    # Gerar imagem
    og_image = gerar_imagem(title)
    
    # Inserir no Supabase
    supabase.table("posts").insert({
        "title": title,
        "slug": slug,
        "content": content,
        "meta_title": meta_title,
        "meta_description": meta_description,
        "hashtags": hashtags,
        "og_image": og_image,
        "published_at": datetime.now().isoformat(),
        "author": autor
    }).execute()
    
    print(f"Post '{title}' criado com sucesso! Slug: {slug}")
    return slug
