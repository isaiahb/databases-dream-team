import React from 'react';
import Api from '../Api';
import { User } from '../interfaces';

interface AuthProps {
  user: User | undefined;
  setUser: React.Dispatch<User>;
}

const DEFAULT_VALUE: AuthProps = {
  user: undefined,
  setUser: () => { }
};

const AuthContext = React.createContext(DEFAULT_VALUE);

const { Provider } = AuthContext

export const AuthProvider: React.FC<{}> = (props) => {
  const [user, setUser] = React.useState(DEFAULT_VALUE.user);

  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log("Auth.tsx use effect");
  //       const _user = await Api.user.me();
  //       setUser(_user);
  //     }
  //     catch (error: any) {
  //       console.log(error?.response?.data);
  //     }
  //   })();
  // }, [])

  // return props.children;
  return (
    <Provider
      value={{
        user,
        setUser,
      }} {...props}
    />
  )
}


// export const AuthProvider = (props: { children: React.ReactNode }) => {
//   const [user, setUser] = React.useState(DEFAULT_VALUE.user);

//   // return props.children;
//   return (
//     <Provider
//       value={{
//         user,
//         setUser,
//       }} {...props}
//     />
//   )

// };

export const useAuth = () => {
  return React.useContext(AuthContext);
};