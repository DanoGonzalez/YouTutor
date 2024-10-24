import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  "(tabs)": undefined;
  StudentRegistration: undefined;
  TutorRegistration: undefined;
  Home: undefined;
  Login: undefined;
  // Add any additional screens here
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
