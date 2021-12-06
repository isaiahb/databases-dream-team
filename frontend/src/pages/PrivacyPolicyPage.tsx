import { Container } from "@mui/material";
import SideMenu from "./SideMenu";

function PrivacyPolicyPage() {

  return (
    <SideMenu>

      <Container>
        <h1>Privacy Policy</h1>
        <p>
          This Service is provided at no cost and is intended for use as is.
        </p>

        <p>
          For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your phone number. We do not sell any of your information. The information that we request will be retained by us and used as described in this Privacy Policy.
        </p>
        <p>
          Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory. We use this to store login data. If you choose to refuse our cookies, you may not be able to use some portions of this Service.
        </p>
      </Container>
    </SideMenu>

  );
}

export default PrivacyPolicyPage;