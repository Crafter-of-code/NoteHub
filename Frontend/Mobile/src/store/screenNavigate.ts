import { createNavigationContainerRef } from '@react-navigation/native';
import { object, string } from 'yup';
import {
  RootStackParamList,
  screenNavigationType,
} from '../types/ScreenNavigationTypes';
export const navigationRef: any = createNavigationContainerRef<any>();
export function navigate(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}
