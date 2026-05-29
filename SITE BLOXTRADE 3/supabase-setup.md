# Guia de Configuração do Supabase para o Blog BLOXtrade

Este guia descreve os passos necessários para configurar o banco de dados e o armazenamento do Supabase para o funcionamento do Painel Administrativo e exibição das postagens do Blog.

---

## 🛠️ Passo 1: Executar o Script SQL no Supabase

Acesse o painel do seu projeto no Supabase, vá em **SQL Editor** -> **New Query**, cole o script abaixo e clique em **Run**:

```sql
-- ==========================================================================
-- 1. CRIAÇÃO DA TABELA DE ARTIGOS
-- ==========================================================================

CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title JSONB NOT NULL,
    content JSONB NOT NULL,
    category TEXT NOT NULL,
    author TEXT DEFAULT 'Equipe BLOXtrade'::text,
    image_url TEXT NOT NULL
);

-- Habilitar a segurança de nível de linha (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Política 1: Permitir leitura pública dos artigos (qualquer pessoa pode ler o blog)
CREATE POLICY "Allow public read access on articles" 
ON public.articles 
FOR SELECT 
USING (true);

-- Política 2: Permitir inserção apenas para usuários autenticados (Administradores)
CREATE POLICY "Allow authenticated insert on articles" 
ON public.articles 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Política 3: Permitir atualização apenas para usuários autenticados (Administradores)
CREATE POLICY "Allow authenticated update on articles" 
ON public.articles 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Política 4: Permitir exclusão apenas para usuários autenticados (Administradores)
CREATE POLICY "Allow authenticated delete on articles" 
ON public.articles 
FOR DELETE 
TO authenticated 
USING (true);


-- ==========================================================================
-- 2. CRIAÇÃO E CONFIGURAÇÃO DO STORAGE BUCKET (IMAGENS)
-- ==========================================================================

-- Criar o bucket de armazenamento de imagens se não existir
INSERT INTO storage.buckets (id, name, public) 
VALUES ('articles_images', 'articles_images', true)
ON CONFLICT (id) DO NOTHING;

-- Política de Storage 1: Permitir visualização pública de todas as imagens de capa
CREATE POLICY "Public Access" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'articles_images');

-- Política de Storage 2: Permitir upload de imagens apenas para administradores logados
CREATE POLICY "Authenticated Insert" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'articles_images');

-- Política de Storage 3: Permitir gerenciamento (edição/deleção) para administradores logados
CREATE POLICY "Authenticated Manage" 
ON storage.objects 
FOR ALL 
TO authenticated 
USING (bucket_id = 'articles_images');
```

---

## 👥 Passo 2: Criar o Usuário Administrador (Login)

Para criar o login que acessará o **Painel Administrativo** (`admin-login.html`):

1. No painel lateral do Supabase, acesse **Authentication** -> **Users**.
2. Clique no botão **Add User** -> **Create User**.
3. Insira o e-mail corporativo desejado (ex: `admin@bloxtrade.com`) e defina uma senha forte.
4. Desmarque a opção "Send auto-confirm email" se quiser que o acesso funcione de forma imediata sem necessidade de validar a caixa de entrada, e clique em **Save**.

---

## 🔑 Passo 3: Vincular as Credenciais no Código

Abra o arquivo [supabase-config.js](file:///d:/BLOXTRADE - SITE/SITE BLOXTRADE/scripts/supabase-config.js) no seu editor e substitua os placeholders pelas credenciais reais do seu projeto:

1. No Supabase, vá em **Project Settings** (ícone de engrenagem) -> **API**.
2. Copie a **Project URL** e cole no lugar de `'YOUR_SUPABASE_URL'`.
3. Copie a chave **anon (public)** e cole no lugar de `'YOUR_SUPABASE_ANON_KEY'`.

```javascript
// Exemplo de como deve ficar o arquivo scripts/supabase-config.js:
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseUrl = 'https://seu-projeto.supabase.co';
const supabaseKey = 'sua-chave-anon-public-copiada-do-painel';

export const supabase = createClient(supabaseUrl, supabaseKey);
```
