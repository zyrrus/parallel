import { Button, Theme } from "@mui/material";
import {
    AppBar,
    Container,
    Toolbar,
    Box,
    Typography,
    Stack,
    Tab,
    Tabs,
} from "@mui/material";
import type { SystemStyleObject } from "@mui/system";
import type { ReactNode } from "react";

const routes: string[] = ["projects", "explore", "go premium", "profile"];

export default function Header() {
    return (
        <>
            <HeaderWrapper>
                <Box>
                    <Typography noWrap variant="h5">
                        ‖ Parallel
                    </Typography>
                </Box>
                <Stack direction="row" columnGap={10}>
                    {routes.map((route) => (
                        <Button
                            key={route}
                            // sx={{ my: 2, color: "white", display: "block" }}
                        >
                            <Typography
                                variant="h5"
                                fontWeight={400}
                                color="contrast"
                            >
                                {route}
                            </Typography>
                        </Button>
                    ))}
                </Stack>
            </HeaderWrapper>
            <HeaderWrapper sxToolbar={{ justifyContent: "center" }}>
                <Tabs variant="scrollable" scrollButtons>
                    <Tab label="Instructions" />
                    <Tab label="Sign Up" />
                    <Tab label="Dashboard" />
                    <Tab label="Blog" />
                    <Tab label="Pricing" />
                    <Tab label="Checkout" />
                </Tabs>
            </HeaderWrapper>
        </>
    );
}

function HeaderWrapper({
    children,
    sxToolbar,
}: {
    children: ReactNode;
    sxToolbar?: SystemStyleObject<Theme>;
}) {
    return (
        <AppBar
            enableColorOnDark
            color="primary"
            sx={{
                backgroundImage: "none",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            position="sticky"
        >
            <Container maxWidth="xl">
                <Toolbar
                    sx={[
                        { justifyContent: "space-between" },
                        sxToolbar ?? null,
                    ]}
                >
                    {children}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
