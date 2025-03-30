import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { BottomSheet } from "@rneui/themed";
import { Calendar } from "react-native-calendars";
import DashedLine from "react-native-dashed-line";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { Colors, Sizes, Fonts, CommonStyles, screenHeight } from "../../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const DateTimePickerSheet = ({
  isVisible,
  onClose,
  selectedDate,
  onSelectDate,
  defaultDate,
  setDefaultDate,
  selectedHour,
  onSelectHour,
  selectedMinute,
  onSelectMinute,
  onConfirm,
  todayDate,
}) => {
  // Generate lists for hours (1-23) and minutes (0-59)
  const hoursList = [...Array(24).keys()].slice(1);
  const minutesList = [...Array(60).keys()];

  return (
    <BottomSheet
      modalProps={{ height: 200 }}
      scrollViewProps={{ scrollEnabled: false }}
      isVisible={isVisible}
      onBackdropPress={onClose}
    >
      <View style={styles.sheetStyle}>
        <Text style={{ ...styles.sheetHeader, marginBottom: Sizes.fixPadding }}>
          Pasirinkite datą ir laiką
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Calendar
            monthFormat={`MMMM  yyyy`}
            renderArrow={(direction) =>
              direction === "left" ? (
                <MaterialIcons name="arrow-back-ios" color={Colors.grayColor} size={18} />
              ) : (
                <MaterialIcons name="arrow-forward-ios" color={Colors.grayColor} size={18} />
              )
            }
            hideExtraDays
            disableMonthChange
            firstDay={1}
            onPressArrowLeft={(subtractMonth) => subtractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            enableSwipeMonths
            dayComponent={({ date }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  onSelectDate(`${date.year}-${date.month}-${date.day}`);
                  setDefaultDate(date.day);
                }}
                style={{
                  ...styles.calenderDateWrapStyle,
                  borderColor: date.day === defaultDate ? Colors.secondaryColor : Colors.whiteColor,
                }}
              >
                <Text style={date.day === defaultDate ? Fonts.secondaryColor16SemiBold : Fonts.blackColor16SemiBold}>
                  {date.day}
                </Text>
              </TouchableOpacity>
            )}
            theme={{
              calendarBackground: Colors.whiteColor,
              textSectionTitleColor: Colors.grayColor,
              monthTextColor: Colors.blackColor,
              textMonthFontFamily: "Montserrat-SemiBold",
              textDayHeaderFontFamily: "Montserrat-Medium",
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,
            }}
          />
          <DashedLine
            dashLength={3}
            dashThickness={1}
            dashColor={Colors.grayColor}
            style={{ marginVertical: Sizes.fixPadding * 2 }}
          />
          <View style={styles.timeWrapper}>
            <ScrollPicker
              dataSource={hoursList}
              selectedIndex={hoursList.indexOf(selectedHour)}
              renderItem={(data) => (
                <Text style={data === selectedHour ? Fonts.primaryColor18SemiBold : Fonts.grayColor15SemiBold}>
                  {data.toString().length === 1 ? `0${data}` : data}
                </Text>
              )}
              onValueChange={(data) => onSelectHour(data)}
              wrapperColor={Colors.whiteColor}
              wrapperHeight={60}
              itemHeight={60}
              highlightColor={Colors.grayColor}
              highlightBorderWidth={1}
            />
            <Text style={{ ...Fonts.primaryColor18SemiBold, marginHorizontal: Sizes.fixPadding * 2 }}>
              :
            </Text>
            <ScrollPicker
              dataSource={minutesList}
              selectedIndex={minutesList.indexOf(selectedMinute)}
              renderItem={(data) => (
                <Text style={data === selectedMinute ? Fonts.primaryColor18SemiBold : Fonts.grayColor15SemiBold}>
                  {data.toString().length === 1 ? `0${data}` : data}
                </Text>
              )}
              onValueChange={(data) => onSelectMinute(data)}
              wrapperColor={Colors.whiteColor}
              wrapperHeight={60}
              itemHeight={60}
              highlightColor={Colors.grayColor}
              highlightBorderWidth={1}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              const displayHour = selectedHour.toString().length === 1 ? `0${selectedHour}` : selectedHour;
              const displayMinute = selectedMinute.toString().length === 1 ? `0${selectedMinute}` : selectedMinute;
              const displayTime = `${displayHour}:${displayMinute}`;
              onConfirm(`${selectedDate ? selectedDate : todayDate} ${displayTime}`);
              onClose();
            }}
            style={{ ...CommonStyles.button, marginHorizontal: Sizes.fixPadding * 2, marginBottom: Sizes.fixPadding * 2 }}
          >
            <Text style={Fonts.whiteColor18Bold}>Gerai</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

const styles = {
  calenderDateWrapStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: Sizes.fixPadding - 7,
    borderWidth: 1.5,
  },
  timeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    margin: Sizes.fixPadding * 2,
    marginBottom: Sizes.fixPadding * 4,
  },
  sheetStyle: {
    backgroundColor: Colors.whiteColor,
    borderTopLeftRadius: Sizes.fixPadding * 4,
    borderTopRightRadius: Sizes.fixPadding * 4,
    paddingTop: Sizes.fixPadding * 2,
    maxHeight: screenHeight - 150,
  },
  sheetHeader: {
    marginHorizontal: Sizes.fixPadding * 2,
    textAlign: "center",
    ...Fonts.primaryColor16SemiBold,
    marginBottom: Sizes.fixPadding * 2.5,
  },
};

export default DateTimePickerSheet;