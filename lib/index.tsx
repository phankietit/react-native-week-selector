import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, Text,  TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Modal from "react-native-modal";
import IonIcon from "react-native-vector-icons/Ionicons";
import styles from "./index.style";
import {RangeDateSelectorProps, IRangeDateSelectorItem} from "../dist/types"

let lazyYears: IRangeDateSelectorItem[][] = [];

const RangeDateSelector = (props: RangeDateSelectorProps) =>
{

  const [visible, setVisible] = useState(false);
  const [currentYear, setCurrentYear] = useState<number>();
  const [data, setData] = useState<IRangeDateSelectorItem[]>([]);
  const [selected, setSelected] = useState<IRangeDateSelectorItem | null>(null);

  useEffect(() =>
  {
    const year = props.currentYear ?? moment().get("year");
    handleChangeYear(year);

  }, []);

  const handleChangeYear = (year: number) =>
  {
    setCurrentYear(year);
    if (props.type === "month")
    {
      lazyYears = [getMonthOfYear(year - 1), getMonthOfYear(year), getMonthOfYear(year + 1)];
    } else
    {
      lazyYears = [getWeekOfYear(year - 1), getWeekOfYear(year), getWeekOfYear(year + 1)];
    }
    if (data.length === 0)
    {
      setData(lazyYears[1]);
    }
  };

  const getWeekOfYear = (year: number) : IRangeDateSelectorItem[] =>
  {
    const weekArray : IRangeDateSelectorItem[] = [];
    for (let index = 1; index <= 52; index++)
    {
      const start = moment({ year }).week(index).startOf("isoWeek");
      const end = moment({ year }).week(index).endOf("isoWeek");

      const week: IRangeDateSelectorItem = {
        id: `${year}_${index}`,
        title: `${ props.weekLabel } ${ index } (${start.format(props.formatDate)} - ${end.format(props.formatDate)})`,
        start,
        end,
        index
      };

      weekArray.push(week);
    }

    return weekArray;
  };

  const getMonthOfYear = (year: number) : IRangeDateSelectorItem[] =>
  {
    const monthArray : IRangeDateSelectorItem[] = [];
    for (let index = 1; index <= 12; index++)
    {
      const start = moment({ year }).month(index - 1).startOf("month");
      const end = moment({ year }).month(index - 1).endOf("month");

      const month: IRangeDateSelectorItem = {
        id: `${year}_${index}`,
        title: `${ start.format("MMMM") } (${start.format(props.formatDate)} - ${end.format(props.formatDate)})`,
        start,
        end,
        index
      };

      monthArray.push(month);
    }

      return monthArray;
  };

  const handleShowPicker = () =>
  {
    setVisible(true);
  };

  const handleHidePicker = () =>
  {
    setVisible(false);
  };

  const handleBackYear = () =>
  {
    setData(lazyYears[0]);
    handleChangeYear(currentYear! - 1);
  };

  const handleForwardYear = () =>
  {
    setData(lazyYears[2]);
    handleChangeYear(currentYear! + 1);
  };

  const handleConfirm = () =>
  {
    if (selected)
    {
      props.onConfirm?.(selected);
      handleHidePicker();
    }
  };

  const renderFooter = () =>
  {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={props.buttonStyle} onPress={handleHidePicker}>
          <Text style={props.buttonTextStyle}>
            {props.closeText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={props.buttonStyle} onPress={handleConfirm}>
          <Text style={props.buttonTextStyle}>
            {props.confirmText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () =>
  {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackYear} style={styles.nextBackYear}>
          <IonIcon size={20} name={"chevron-back-outline"} />
        </TouchableOpacity>
        <View style={styles.year}>
          <Text style={props.yearTextStyle}>
            {currentYear}
          </Text>
        </View>
        <TouchableOpacity onPress={handleForwardYear} style={styles.nextBackYear}>
          <IonIcon size={20} name={"chevron-forward-outline"} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: IRangeDateSelectorItem, index: number }) =>
  {
    return (
      <TouchableOpacity onPress={() => setSelected(item)}>
        {props.renderItem?.({ item, index, selected: item.id === selected?.id }) ?? (
          <View style={[props.labelStyle, { backgroundColor: item.id === selected?.id ? props.selectedColor : "#fff" }]}>
            <Text style={props.labelTextStyle} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderBody = () =>
  {
    return (
      <FlatList
        style={styles.flatList}
        data={data ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={20}
      />
    );
  };
  
  const renderContent = () =>
  {
    return (
      <View style={styles.container}>
        {renderHeader()}
        {renderBody()}
        {renderFooter()}
      </View>
    );
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={handleShowPicker}>
        {props.children}
      </TouchableWithoutFeedback>
      <Modal
        backdropColor={"#ffffff"}
        backdropOpacity={0.5}
        isVisible={visible}
        statusBarTranslucent
        useNativeDriver
        hideModalContentWhileAnimating
      >
        {renderContent()}
      </Modal>
    </>
  );
};

RangeDateSelector.defaultProps = {
  weekLabel: "Tuần",
  formatDate: "DD/MM",
  selectedColor: "#ccc",
  closeText: "Đóng",
  confirmText: "Xác nhận",
  buttonStyle: styles.button,
  buttonTextStyle: styles.buttonText,
  yearTextStyle: styles.yearText,
  labelStyle: styles.label,
  labelTextStyle: styles.labelText,
};

export default RangeDateSelector;
