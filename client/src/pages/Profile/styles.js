const styles = theme => ({
  profileContainer: {
    padding: 89,
    // width: 1450,
    height: "100%",
    width: "100%",
    backgroundColor: "#212121"
  },
  itemsSharedContainer: {
    display: "flex",
    flexDirection: "row",
    justfiyContent: "center",
    alignItems: "center",
    background: "#e9e9e9",
    height: "100%"
  },
  usersBanner: {
    display: "flex",
    alignItems: "center"
  },
  userGravatar: {
    paddingRight: "10px",
    borderRadius: "50%"
  },
  userFullname: {
    fontSize: 45,
    color: "#616161"
  },
  userData: {
    fontSize: 25
  },
  itemsSharedContainer: {
    background: "#fafafa",
    display: "flex",
    flexDirection: "column",
    padding: 44,
    marginBottom: 37
  },
  userBio: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: theme.spacing(2)
  },
  bold: {
    fontWeight: 600,
    display: "inline-block",
    paddingBottom: "10px"
  },
  sharedItemsTitle: {
    color: "#ffab00"
  }
});

export default styles;
