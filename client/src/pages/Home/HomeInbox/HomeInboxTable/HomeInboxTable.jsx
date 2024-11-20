import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { uid } from "uid";
import {ChevronRight} from "lucide-react";

const mails = [
    {
        id : uid(8),
        address: "temp1@ghostmails.site",
        subject: "Hello 1",
        time: "Tue Nov 19 2024 12:16:12 GMT+0530 (India Standard Time)"
    },
    {
        id : uid(8),
        address: "temp2@ghostmails.site",
        subject: "Hello 2",
        time: "Tue Nov 19 2024 12:16:12 GMT+0530 (India Standard Time)"
    },
    {
        id : uid(8),
        address: "temp1@ghostmails.site",
        subject: "Hello 3",
        time: "Tue Nov 19 2024 12:16:12 GMT+0530 (India Standard Time)"
    }
];

const HomeInboxTable = () => {
    return (
        <Table>
            <TableCaption>All Mails</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>View</TableHead>

                </TableRow>
            </TableHeader>
            <TableBody>
                {mails.map(mail => (
                    <TableRow id={mail.id}>
                        <TableCell>{mail.address}</TableCell>
                        <TableCell>{mail.subject}</TableCell>
                        <TableCell>{mail.time}</TableCell>
                        <TableCell><ChevronRight/></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default HomeInboxTable;