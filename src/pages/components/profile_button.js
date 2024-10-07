import { Avatar, Button, Grid, styled } from "@mui/material";
import Link from "next/link"; // Import Link from Next.js

// Custom styled Link component to override default styles
const StyledLink = styled(Link)`
  && {
    color: inherit;
    text-decoration: none;
  }
`;

export default function ProfileButton({ userId }) { // Accept userId as a prop
  return (
    <Grid item xs={6}>
      <Grid container justifyContent="flex-end" ml={1}>
        <Button color="inherit">
          <StyledLink href={`/dashboard/profile/`}>
            <Avatar alt="Ricardo Avatar" src="/path/to/avatar.jpg" sx={{ width: 30, height: 30, padding: 1 }} />
          </StyledLink>
        </Button>
      </Grid>
    </Grid>
  );
}
