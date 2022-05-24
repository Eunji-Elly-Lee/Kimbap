/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package models;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author duckp
 */
@Entity
@Table(name = "gimbap")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Gimbap.findAll", query = "SELECT g FROM Gimbap g")
    , @NamedQuery(name = "Gimbap.findByGimbapId", query = "SELECT g FROM Gimbap g WHERE g.gimbapId = :gimbapId")
    , @NamedQuery(name = "Gimbap.findByGimbapName", query = "SELECT g FROM Gimbap g WHERE g.gimbapName = :gimbapName")
    , @NamedQuery(name = "Gimbap.findByPrice", query = "SELECT g FROM Gimbap g WHERE g.price = :price")})
public class Gimbap implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "gimbap_id")
    private Integer gimbapId;
    @Basic(optional = false)
    @Column(name = "gimbap_name")
    private String gimbapName;
    @Basic(optional = false)
    @Column(name = "price")
    private double price;

    public Gimbap() {
    }

    public Gimbap(Integer gimbapId) {
        this.gimbapId = gimbapId;
    }

    public Gimbap(Integer gimbapId, String gimbapName, double price) {
        this.gimbapId = gimbapId;
        this.gimbapName = gimbapName;
        this.price = price;
    }

    public Integer getGimbapId() {
        return gimbapId;
    }

    public void setGimbapId(Integer gimbapId) {
        this.gimbapId = gimbapId;
    }

    public String getGimbapName() {
        return gimbapName;
    }

    public void setGimbapName(String gimbapName) {
        this.gimbapName = gimbapName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (gimbapId != null ? gimbapId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Gimbap)) {
            return false;
        }
        Gimbap other = (Gimbap) object;
        if ((this.gimbapId == null && other.gimbapId != null) || (this.gimbapId != null && !this.gimbapId.equals(other.gimbapId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "models.Gimbap[ gimbapId=" + gimbapId + " ]";
    }
    
}
