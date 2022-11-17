import { Button, Modal } from "react-bootstrap";
import { imgClient, imgProduct } from "../../Helpers/imgControls";

export const ModalCreateProduct = ({
  handleClose,
  show,
  isOpenMProduct,
  closeMProduct,
}: any) => {
  return (
    <form className="formulario" style={{background: "red"}}>
      <Modal
        show={isOpenMProduct}
        onHide={closeMProduct}
        className="containerModal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="title">Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="containerImg">
            <img src={imgProduct} alt="" />
            <input type="file" name="file" />
          </div>
          <div className="containerBody">
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
        <Modal.Footer>
          <Button variant="secondary" onClick={closeMProduct}>
            Close
          </Button>
          <Button variant="primary" onClick={closeMProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
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
        className="containerModal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="title">Create Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="containerImg">
            <img src={imgClient} alt="" />
          </div>
          <div className="containerBody">
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
        <Modal.Footer>
          <Button variant="secondary" onClick={closeMClient}>
            Close
          </Button>
          <Button variant="primary" onClick={closeMClient}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};
