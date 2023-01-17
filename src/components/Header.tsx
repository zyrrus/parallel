import type { SxProps, Theme } from "@mui/material";
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
import type { ReactNode } from "react";

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
                    <Typography noWrap variant="h6" fontWeight={400}>
                        Route 1
                    </Typography>
                    <Typography noWrap variant="h6" fontWeight={400}>
                        Route 2
                    </Typography>
                    <Typography noWrap variant="h6" fontWeight={400}>
                        Route 3
                    </Typography>
                    <Typography noWrap variant="h6" fontWeight={400}>
                        Route 4
                    </Typography>
                </Stack>
            </HeaderWrapper>
            <HeaderWrapper>
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
    sxToolbar = [],
}: {
    children: ReactNode;
    sxToolbar?: SxProps<Theme>;
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
                        ...(Array.isArray(sxToolbar)
                            ? (sxToolbar as SxProps<Theme>)
                            : [sxToolbar]),
                    ]}
                >
                    {children}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
