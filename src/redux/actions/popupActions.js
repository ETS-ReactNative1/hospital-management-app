export const showPopup = (popupType, popupProps) => ({
  type: 'SHOW_POPUP',
  popupType,
  popupProps
});

export const hidePopup = () => ({
  type: 'HIDE_POPUP'
});
