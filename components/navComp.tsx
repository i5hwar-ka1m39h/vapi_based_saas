'use client'
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    {
        id:1,
        title:"Home",
        href:"/"
    },
    {
        id:2,
        title:"All bots",
        href:"/bots"
    },
    {
        id:3,
        title:"Profile",
        href:"/profile"
    }
]

const NavComp = () => {
    const pathName = usePathname()
    console.log(pathName);
    
  return (
    <div className="flex items-center gap-4">
        {navItems.map(each=>(
            <div key={each.id} className={cn(pathName === each.href && 'text-primary font-semibold')}>
                <Link href={each.href}>
                {each.title}
                </Link>
            </div>
        ))}
    </div>
  )
}

export default NavComp