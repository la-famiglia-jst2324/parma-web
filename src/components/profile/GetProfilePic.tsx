import { useContext, useEffect, useState } from 'react'
import 'firebase/auth'
import Image from 'next/image'
import { AuthContext } from '@/lib/firebase/auth'

// TODO: Add a default profile pic
export default function UserProfile() {
  const user = useContext(AuthContext)
  const [photoUrl, setPhotoUrl] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtKCjQ0e2wwW4YzS1C9NYprZG21crS04Kmj-wPkHUmom_v-6T2WkZshUuAZw&s'
  )
  useEffect(() => {
    if (user === 'loading') return
    if (user?.photoURL) {
      setPhotoUrl(user.photoURL)
    }
  }, [user])
  return <div>{photoUrl && <Image src={photoUrl} width={500} height={500} alt="User Profile" />}</div>
}
