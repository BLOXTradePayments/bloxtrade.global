# Configuração do Supabase para Carreiras / Candidaturas

Este script configura a tabela de banco de dados e as políticas de segurança de armazenamento (Storage RLS) para receber e gerenciar candidaturas de emprego.

---

## 🛠️ Passo Único: Executar no SQL Editor do Supabase

Acesse o painel do seu projeto no Supabase, vá em **SQL Editor** -> **New Query**, cole o script abaixo e clique em **Run**:

```sql
-- ==========================================================================
-- 1. CRIAÇÃO DA TABELA DE CANDIDATURAS (CAREERS APPLICATIONS)
-- ==========================================================================

CREATE TABLE IF NOT EXISTS public.careers_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    city_state TEXT NOT NULL,
    area TEXT NOT NULL,
    level TEXT NOT NULL,
    source TEXT NOT NULL,
    linkedin_url TEXT,
    portfolio_url TEXT,
    resume_url TEXT NOT NULL
);

-- Habilitar a segurança de nível de linha (RLS)
ALTER TABLE public.careers_applications ENABLE ROW LEVEL SECURITY;

-- Política 1: Permitir inserção pública (qualquer candidato pode se inscrever)
CREATE POLICY "Allow public insert on careers_applications" 
ON public.careers_applications 
FOR INSERT 
WITH CHECK (true);

-- Política 2: Permitir leitura apenas para administradores autenticados
CREATE POLICY "Allow authenticated select on careers_applications" 
ON public.careers_applications 
FOR SELECT 
TO authenticated 
USING (true);

-- Política 3: Permitir exclusão apenas para administradores autenticados
CREATE POLICY "Allow authenticated delete on careers_applications" 
ON public.careers_applications 
FOR DELETE 
TO authenticated 
USING (true);


-- ==========================================================================
-- 2. CRIAÇÃO E CONFIGURAÇÃO DO STORAGE BUCKET (CURRÍCULOS - PRIVADO/SEGURO)
-- ==========================================================================

-- Criar o bucket de armazenamento de currículos se não existir
-- Criamos como público = false por compliance de LGPD (dados pessoais nos CVs)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Política de Storage 1: Permitir upload público (qualquer candidato pode enviar o currículo)
CREATE POLICY "Allow public upload to resumes" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'resumes');

-- Política de Storage 2: Permitir leitura apenas para administradores autenticados (Signed URLs)
CREATE POLICY "Allow authenticated select on resumes" 
ON storage.objects 
FOR SELECT 
TO authenticated 
USING (bucket_id = 'resumes');

-- Política de Storage 3: Permitir exclusão apenas para administradores autenticados
CREATE POLICY "Allow authenticated delete on resumes" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'resumes');
```
