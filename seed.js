const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')


const users = [
    { 
        username: "Billy",
        password: "test"
    },
    {
        username: "Emma",
        password: "test"
    },
    {
        username: "John",
        password: "test"
    }
]

const posts = [
    {
        title: "My First Post",
        content: "Welcome to my post",
        userId: 1
    },
    {
        title: "My Second Post",
        content: "Hi there",
        userId: 1
    },
    {
        title: "My Third Post",
        content: "Whats up",
        userId: 1
    },
    {
        title: "My First Post",
        content: "Welcome to my post",
        userId: 2
    },
    {
        title: "My Second Post",
        content: "Hi there",
        userId: 2
    },
    {
        title: "My Third Post",
        content: "Whats up",
        userId: 2
    },
    {
        title: "My First Post",
        content: "Welcome to my post",
        userId: 3
    },
    {
        title: "My Second Post",
        content: "Hi there",
        userId: 3
    },
    {
        title: "My Third Post",
        content: "Whats up",
        userId: 3
    }
]

async function main() {
    salt_rounds = 5;
    await Promise.all(
       users.map( async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, salt_rounds)
            return prisma.user.create({
                data: {
                    username: user.username,
                    password: hashedPassword
                }
            })
        }),
        posts.map(async (post) => {
            return prisma.post.create({
                data: {
                    title: post.title,
                    content: post.content,
                    userId: post.userId
                }
            })
        }
    ))
    

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

// async function main() {
//   const alice = await prisma.user.upsert({
//     where: { email: 'alice@prisma.io' },
//     update: {},
//     create: {
//       email: 'alice@prisma.io',
//       name: 'Alice',
//       posts: {
//         create: {
//           title: 'Check out Prisma with Next.js',
//           content: 'https://www.prisma.io/nextjs',
//           published: true,
//         },
//       },
//     },
//   })

//   const bob = await prisma.user.upsert({
//     where: { email: 'bob@prisma.io' },
//     update: {},
//     create: {
//       email: 'bob@prisma.io',
//       name: 'Bob',
//       posts: {
//         create: [
//           {
//             title: 'Follow Prisma on Twitter',
//             content: 'https://twitter.com/prisma',
//             published: true,
//           },
//           {
//             title: 'Follow Nexus on Twitter',
//             content: 'https://twitter.com/nexusgql',
//             published: true,
//           },
//         ],
//       },
//     },
//   })
//   console.log({ alice, bob })
// }
