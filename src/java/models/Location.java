package models;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;
import javax.xml.bind.annotation.*;

@Entity
@Table(name = "location")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Location.findAll", query = "SELECT l FROM Location l")
    , @NamedQuery(name = "Location.findByLocationId", query = "SELECT l FROM Location l WHERE l.locationId = :locationId")
    , @NamedQuery(name = "Location.findByLocationDetail", query = "SELECT l FROM Location l WHERE l.locationDetail = :locationDetail")})
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "location_id")
    private Integer locationId;
    @Basic(optional = false)
    @Column(name = "location_detail")
    private String locationDetail;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "location", fetch = FetchType.EAGER)
    private List<OrderInfo> orderInfoList;

    public Location() {
    }

    public Location(Integer locationId) {
        this.locationId = locationId;
    }

    public Location(Integer locationId, String locationDetail) {
        this.locationId = locationId;
        this.locationDetail = locationDetail;
    }

    public Integer getLocationId() {
        return locationId;
    }

    public void setLocationId(Integer locationId) {
        this.locationId = locationId;
    }

    public String getLocationDetail() {
        return locationDetail;
    }

    public void setLocationDetail(String locationDetail) {
        this.locationDetail = locationDetail;
    }

    @XmlTransient
    public List<OrderInfo> getOrderInfoList() {
        return orderInfoList;
    }

    public void setOrderInfoList(List<OrderInfo> orderInfoList) {
        this.orderInfoList = orderInfoList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (locationId != null ? locationId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Location)) {
            return false;
        }
        Location other = (Location) object;
        if ((this.locationId == null && other.locationId != null) || (this.locationId != null && !this.locationId.equals(other.locationId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.Location[ locationId=" + locationId + " ]";
    }
}
