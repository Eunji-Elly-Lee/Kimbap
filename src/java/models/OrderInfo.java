package models;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;
import javax.xml.bind.annotation.*;

@Entity
@Table(name = "order")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "OrderInfo.findAll", query = "SELECT o FROM OrderInfo o")
    , @NamedQuery(name = "OrderInfo.findByOrderId", query = "SELECT o FROM OrderInfo o WHERE o.orderId = :orderId")
    , @NamedQuery(name = "OrderInfo.findByName", query = "SELECT o FROM OrderInfo o WHERE o.name = :name")})
public class OrderInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "order_id")
    private Integer orderId;
    @Basic(optional = false)
    @Column(name = "name")
    private String name;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "orderInfo", fetch = FetchType.EAGER)
    private List<OrderDetail> orderDetailList;
    @JoinColumn(name = "location", referencedColumnName = "location_id")
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    private Location location;

    public OrderInfo() {
    }

    public OrderInfo(Integer orderId) {
        this.orderId = orderId;
    }

    public OrderInfo(Integer orderId, String name) {
        this.orderId = orderId;
        this.name = name;
    }

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @XmlTransient
    public List<OrderDetail> getOrderDetailList() {
        return orderDetailList;
    }

    public void setOrderDetailList(List<OrderDetail> orderDetailList) {
        this.orderDetailList = orderDetailList;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (orderId != null ? orderId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof OrderInfo)) {
            return false;
        }
        OrderInfo other = (OrderInfo) object;
        if ((this.orderId == null && other.orderId != null) || (this.orderId != null && !this.orderId.equals(other.orderId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.OrderInfo[ orderId=" + orderId + " ]";
    }
}
