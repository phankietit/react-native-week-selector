# react-native-week-selector

## Usage

```javascript
import {
  IRangeDateSelectorItem,
  RangeDateSelector,
} from "@phankiet/react-native-week-selector";

<RangeDateSelector
  type={"week"}
  onConfirm={handleChangeWeek}
  weekLabel={t("weekLabel")}
  closeText={t("close")}
  confirmText={t("confirm")}
>
  <View style={[styles.pickerWrapper, { flex: 3 }]}>
    <View style={styles.labelDate}>
      <Text style={styles.pickerText}>{"Select week"}</Text>
      <IonIcon name={"chevron-down"} size={18} color={colors.orangePrimary} />
    </View>
  </View>
</RangeDateSelector>;
```

## Properties

| Name            | Type                                                                            | Default              | Required | Description                                                        |
| --------------- | ------------------------------------------------------------------------------- | -------------------- | -------- | ------------------------------------------------------------------ |
| children        | node                                                                            | none                 | true     | The interface when the user presses to select will display a popup |
| type            | "week" or "month"                                                               | "week"               | false    | Type of selector                                                   |
| weekLabel       | string                                                                          | "Tuần"               | false    | Label of week item                                                 |
| formatDate      | string                                                                          | "DD/MM"              | false    | Date format of item                                                |
| renderItem      | { item: IRangeDateSelectorItem, index: number, selected: boolean }) => function | node                 | false    | Item UI                                                            |
| selectedColor   | string                                                                          | "#ccc"               | false    |
| buttonStyle     | ViewStyle                                                                       |                      | false    |
| buttonTextStyle | TextStyle                                                                       |                      | false    |
| yearTextStyle   | TextStyle                                                                       |                      | false    |
| labelStyle      | ViewStyle                                                                       |                      | false    |
| labelTextStyle  | TextStyle                                                                       |                      | false    |
| closeText       | string                                                                          | "Đóng"               | false    |
| confirmText     | string                                                                          | "Xác nhận"           | false    |
| currentYear     | number                                                                          | moment().get("year") | false    |
| onConfirm       | (selected: IRangeDateSelectorItem) => function                                  | none                 | false    |
