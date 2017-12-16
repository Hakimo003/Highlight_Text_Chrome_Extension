package Traitement;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import BaseDeDonnee.Connexion;


/**
 * Servlet implementation class EnregistrerServlet
 */
public class EnregistrerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EnregistrerServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		String tab=request.getParameter("contenu");
		String email=request.getParameter("email");
		String doc=request.getParameter("doc");
		System.out.println(email+" "+doc);
		System.out.println(tab);

		String[] data=tab.split("\"],");
		String[] str = null,str2 = null;
		//System.out.println("**********Debut ***********");
		for(int i=0;i<data.length;i++){
			if(i==0){
				 str=data[i].split("\\[\\[\"");
					data[i]=str[1];
			
			}else if(i==data.length-1){
				str=data[i].split("\"\\]\\]");
			
				data[i]=str[0];
				str2=data[i].split("\\[\"");
				data[i]=str2[1];
			}else{
				str=data[i].split("\\[\"");
				data[i]=str[1];
			}
		
			//System.out.println(i+" "+ data[i]);
		}
		
		//System.out.println("**********Fin ***********");
		
		Connection con=Connexion.getConnection();
		PreparedStatement ps;
		int idUser=0,idDoc=0;
		try {
			//teste si l'utilisateur existe ou non
			ps = con.prepareStatement("Select count(*) from users where email=?");
			ps.setString(1, email);
			ResultSet rs=ps.executeQuery();
			while(rs.next()){
				//si l'utilisateur n'existe pas on doit l'ajouter à la base de donnees
				if(rs.getInt(1)==0){
					ps=con.prepareStatement("insert into users(email) values (?)");
					ps.setString(1, email);
					ps.executeUpdate();
				}
			}
			//on recupre le id de l'utilisateur
			ps = con.prepareStatement("Select id from users where email=?");
			ps.setString(1, email);
			 rs=ps.executeQuery();
			while(rs.next()){
				idUser=rs.getInt(1);
			}
			
			//teste si le document existe ou non
			ps = con.prepareStatement("Select count(*) from documents where urlDocument=?");
			ps.setString(1, doc);
			 rs=ps.executeQuery();
			while(rs.next()){
				//si le document n'existe pas on doit l'ajouter à la base de donnees
				if(rs.getInt(1)==0){
					ps=con.prepareStatement("insert into documents(urlDocument) values (?)");
					ps.setString(1, doc);
					ps.executeUpdate();
				}
			}
			//on recupre le id de doc
			ps = con.prepareStatement("Select id from  documents where urlDocument=?");
			ps.setString(1, doc);
			 rs=ps.executeQuery();
			while(rs.next()){
				idDoc=rs.getInt(1);
			}
			
			for(int i=0;i<data.length;i++){
				ps=con.prepareStatement("select count(*) from contenu  where idUser=? and idDocument=? and text=? ");
				ps.setInt(1, idUser);
				ps.setInt(2, idDoc);
				ps.setString(3, data[i]);
				rs=ps.executeQuery();
				while(rs.next()){
					if(rs.getInt(1)==0){
						ps = con.prepareStatement("insert into contenu (idUser,idDocument,text) values (?,?,?)");
						ps.setInt(1, idUser);
						ps.setInt(2, idDoc);
						ps.setString(3, data[i]);
						ps.executeUpdate();
					}
				}

			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
