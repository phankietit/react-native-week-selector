import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 10,
    maxHeight: "50%",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 12,
  },
  nextBackYear: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center"
  },
  year: {
    flex: 1,
    alignItems: "center"
  },
  flatList: {
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 15,
  },
  yearText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  label: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 14,
  }
});

export default styles;