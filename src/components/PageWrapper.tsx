import {
    Box,
    Container,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";

import type { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SidePanel from "./SidePanel";

export default function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Header />
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "row",
                }}
            >
                {/* <SidePanel /> */}
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {children}
                    <Footer />
                </Box>
            </Box>
        </Box>
    );
}
