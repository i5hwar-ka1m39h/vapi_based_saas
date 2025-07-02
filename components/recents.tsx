import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { subjects } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
interface Bot {
  id: string
  subject: string
  name: string
  topic: string
  duration: number
  color: number

}

interface RecentsProp {
  title: string
  bots?: Bot[]
  className?: string
}

const Recents = ({ title, bots, className }: RecentsProp) => {
  return (
    <article className={cn("companion-list", className)}>
      <h2 className="font-bold text-2xl">Recents</h2>
      <Table>

        <TableHeader>
          <TableRow>
            <TableHead className="w-2/3 text-lg">Lesson</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
            {
              bots?.map((each) => (
                <TableRow key={each.id}>

                  <TableCell>
                    <Link href={`/bots/${each.id}`}>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center size-[72px] rounded-lg max-lg:hidden">
                          <Image src={`/icons/${each.subject}.svg`} alt={`${each.subject} icon`} width={35} height={35}/>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="font-bold text-2xl">
                            {each.name}
                          </p>
                          <p className="text-lg">
                            {each.topic}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </TableCell>

                  <TableCell>
                    <div className="subject-badge w-fit max-md:hidden">
                      {each.subject}
                    </div>
                    <div className="flex items-center justify-center md:hidden rounded-lg p-2 w-fit">
                      <Image src={`/icons/${each.subject}.svg`} alt={each.subject} width={18} height={18}/>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 justify-end w-full">
                      <p className=" text-2xl">
                        {each.duration}{" "}
                        <span className=" max-md:hidden">mins</span>
                      </p>
                      <Image src={"/icons/clock.svg"} alt="clock icon" width={18} height={18}/>
                    </div>
                  </TableCell>


                </TableRow>
              ))
            }
          
        </TableBody>
      </Table>
    </article>
  )
}

export default Recents