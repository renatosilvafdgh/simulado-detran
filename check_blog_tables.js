import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config({ path: '.env' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkTables() {
    console.log('Checking "posts" table...')
    const { count: postsCount, error: postsError } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })

    if (postsError) {
        console.error('Error checking "posts" table:', postsError.message)
    } else {
        console.log(`"posts" table has ${postsCount || 0} rows.`)
    }

    console.log('Checking "blog_posts" table...')
    const { count: blogPostsCount, error: blogPostsError } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })

    if (blogPostsError) {
        console.error('Error checking "blog_posts" table:', blogPostsError.message)
    } else {
        console.log(`"blog_posts" table has ${blogPostsCount || 0} rows.`)
    }
}

checkTables()
