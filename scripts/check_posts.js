
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://uebewihyttehjdzazsku.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlYmV3aWh5dHRlaGpkemF6c2t1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExODI0NzUsImV4cCI6MjA4Njc1ODQ3NX0.6f_NJ8L_7ZydmrnNS8aOmdT5mquOytlc22ugsq-KU0o"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function check() {
    console.log('Attempting to fetch posts from "posts" table...')
    const { data, error } = await supabase
        .from('posts')
        .select('*')

    if (error) {
        console.error('Error fetching posts:', JSON.stringify(error, null, 2))
        return
    }
    if (data.length > 0) {
        const p = data[0];
        console.log('Post ID:', p.id);
        console.log('Post Slug:', p.slug);
        console.log('Post Published At:', p.published_at);
        console.log('Post Published (col):', p.published);
        console.log('Post Title:', p.title);
    }
}

check()
