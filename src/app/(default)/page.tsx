import ContactBlock from '@/components/contact-block'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function HomePage() {
  return (
    <div className=" justify-center text-center">
      <ContactBlock />
       {/* <Button>
          <Link href="/signup">Sign Up</Link>
        </Button>

        <Button>
          <Link href="/login">Sign In</Link>
        </Button> */}
    </div>
  )
}

export default HomePage
