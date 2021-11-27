import { TextStyle, ViewStyle } from "react-native";
import { Moment } from "moment";

interface RangeDateSelectorProps
{
  children: JSX.Element,
  type: "week" | "month",
  weekLabel?: string,
  formatDate?: string,
  renderItem?: ({ item, index, selected }: { item: IRangeDateSelectorItem, index: number, selected: boolean }) => JSX.Element,
  selectedColor?: string,
  buttonStyle?: ViewStyle | ViewStyle[],
  buttonTextStyle?: TextStyle | TextStyle[],
  yearTextStyle?: TextStyle | TextStyle[],
  labelStyle?: ViewStyle | ViewStyle[],
  labelTextStyle?: TextStyle | TextStyle[],
  closeText?: string,
  confirmText?: string,
  onConfirm?: (selected: IRangeDateSelectorItem) => void,
  currentYear?: number
}


interface IRangeDateSelectorItem
{
  title: string,
  start: Moment,
  end: Moment,
  index: number,
  id: string
}

export {RangeDateSelectorProps, IRangeDateSelectorItem}