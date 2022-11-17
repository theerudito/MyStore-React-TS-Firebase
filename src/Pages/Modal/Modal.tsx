import { Button, Modal } from "react-bootstrap";
import { imgClient, imgProduct } from "../../Helpers/imgControls";

export const ModalCreateProduct = ({ isOpenMProduct, closeMProduct }: any) => {
  return (
    <form>
      <Modal
        show={isOpenMProduct}
        onHide={closeMProduct}
        className="containerModalProduct"
      >
        <Modal.Header className="titleModalProduct" closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModalProduct">
          <div className="containerImgProduct">
            <img src={imgProduct} alt="" />
            <input type="file" name="file" />
          </div>
          <div className="containerInputProduct">
            <div className="containerP1">
              <div>
                <label htmlFor="">BarCode</label>
                <input type="search" />
              </div>

              <div>
                <label htmlFor="">Nombre</label>
                <input type="text" />
              </div>
            </div>

            <div className="containerP2">
              <div>
                <label htmlFor="">Marca</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Description</label>
                <input type="text" />
              </div>
            </div>

            <div className="containerP3">
              <div>
                <label htmlFor="">Stock</label>
                <input type="text" />
              </div>

              <div>
                <label htmlFor="">Precio</label>
                <input type="text" />
              </div>

              <div>
                <label htmlFor="">Descuento</label>
                <input type="text" />
              </div>
            </div>
          </div>
        </Modal.Body>

        <div className="footerModalProduct">
          <button className="btn1" onClick={closeMProduct}>
            Close
          </button>
          <button className="btn2" onClick={closeMProduct}>
            Save Changes
          </button>
        </div>
      </Modal>
    </form>
  );
};

export const ModalCreateClient = ({ isOpenMClient, closeMClient }: any) => {
  return (
    <form>
      <Modal
        show={isOpenMClient}
        onHide={closeMClient}
        className="containerModalClient"
      >
        <Modal.Header closeButton className="titleModalClient">
          <Modal.Title  >Create Client</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bodyModalClient">
          <div className="containerImgClient">
            <img src={imgClient} alt="" />
          </div>
          <div className="containerInputClient">
            <div className="containerC1">
              <div>
                <label htmlFor="">CI</label>
                <input type="search" />
                <button>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div>
                <label htmlFor="">Telefono</label>
                <input type="text" />
              </div>
            </div>

            <div className="containerC2">
              <div>
                <label htmlFor="">Nombres</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Apellidos</label>
                <input type="text" />
              </div>
            </div>

            <div className="containerC3">
              <label htmlFor="">Direccion</label>
              <input type="text" />
            </div>

            <div className="containerC4">
              <div>
                <label htmlFor="">Email</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Ciudad</label>
                <input type="text" />
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className="footerModalClient">
        <button className="btn1" onClick={closeMClient}>
          Close
        </button>
        <button className="btn2" onClick={closeMClient}>
          Save Changes
        </button>
        </div>
      </Modal>
    </form>
  );
};
