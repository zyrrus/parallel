import { Button } from "@mui/material";
import { AppBar, Container, Toolbar, Typography, Stack } from "@mui/material";
import { theme } from "@styles/muiTheme";
import { authedRoutes, defaultRoutes } from "src/constants/routes";

export default function Header() {
    const routes = defaultRoutes;

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
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography noWrap variant="h5">
                        ‖ Parallel
                    </Typography>
                    <Stack direction="row" columnGap={10}>
                        {routes.map((route) => (
                            <Button key={route}>
                                <Typography
                                    variant="h5"
                                    color={theme.palette.common.black}
                                >
                                    {route}
                                </Typography>
                            </Button>
                        ))}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
