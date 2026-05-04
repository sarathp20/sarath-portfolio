// auth.ts (root level — not inside src or app)
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Hardcode YOUR credentials — this is a personal admin panel
        // no need for a users table for a single-person dashboard
        if (
          credentials.email    === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id:    '1',
            email: process.env.ADMIN_EMAIL,
            name:  'Sarath P',
          }
        }
        return null // returning null = login failed
      },
    }),
  ],
  pages: {
    signIn: '/admin', // redirect to your login page
  },
})