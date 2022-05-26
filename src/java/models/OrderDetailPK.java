package models;

import java.io.Serializable;
import javax.persistence.*;

@Embeddable
public class OrderDetailPK implements Serializable {
    @Basic(optional = false)
    @Column(name = "email")
    private String email;
    @Basic(optional = false)
    @Column(name = "order_id")
    private int orderId;
    @Basic(optional = false)
    @Column(name = "gimbap_id")
    private int gimbapId;

    public OrderDetailPK() {
    }

    public OrderDetailPK(String email, int orderId, int gimbapId) {
        this.email = email;
        this.orderId = orderId;
        this.gimbapId = gimbapId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getGimbapId() {
        return gimbapId;
    }

    public void setGimbapId(int gimbapId) {
        this.gimbapId = gimbapId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (email != null ? email.hashCode() : 0);
        hash += (int) orderId;
        hash += (int) gimbapId;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof OrderDetailPK)) {
            return false;
        }
        OrderDetailPK other = (OrderDetailPK) object;
        if ((this.email == null && other.email != null) || (this.email != null && !this.email.equals(other.email))) {
            return false;
        }
        if (this.orderId != other.orderId) {
            return false;
        }
        if (this.gimbapId != other.gimbapId) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.OrderDetailPK[ email=" + email + ", orderId=" + orderId + ", gimbapId=" + gimbapId + " ]";
    }
}
