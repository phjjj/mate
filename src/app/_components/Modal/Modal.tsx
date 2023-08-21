import classes from "./Modal.module.css";
import ReactDom from "react-dom";

export const Backdrop = (props: any) => {
  return <div onClick={props.onClick} className={classes.backdrop} />;
};

export const ModalOverlay = (props: any) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = (props: any) => {
  // const portalElement = document.querySelector("#overlays") as HTMLElement;
  return (
    <>
      {/* {ReactDom.createPortal(<Backdrop onClick={props.onClick} />, portalElement)}
      {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)} */}

      <Backdrop onClick={props.onClick} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
};

export default Modal;
