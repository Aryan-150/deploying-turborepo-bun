import Users from "../components/test";

export default async function Home() {
  return (
    <Users />
  )
}

// export const revalidate = 60 // revalidate every 60 seconds
// or
// export const dynamic = 'force-dynamic'