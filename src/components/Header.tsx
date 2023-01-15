import { AppBar, Container, Toolbar } from "@mui/material";

export default function Header() {
    return (
        <AppBar color="primary" enableColorOnDark position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters></Toolbar>
            </Container>
        </AppBar>
    );
}
