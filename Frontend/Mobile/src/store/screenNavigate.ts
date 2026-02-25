import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
export const navigationRef: any = createNavigationContainerRef();
export function navigate(name?: string, param?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, param);
  }
}
export function push(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: name }],
      }),
    );
  }
}
