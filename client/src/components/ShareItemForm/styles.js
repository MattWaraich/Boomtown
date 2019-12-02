const styles = theme => ({
  sharePageInput: {
    paddingLeft: "50px"
  },
  sharePageTitle: {
    width: "80%"
  },
  shareButton: {
    backgroundColor: "#fafafa"
  },
  tagsOptions: {
    display: "grid",
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(1),
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr) )",
    paddingBottom: "20px"
  },
  selectImageButton: {
    backgroundColor: "#ffa000",
    width: "100%"
  }
});

export default styles;
