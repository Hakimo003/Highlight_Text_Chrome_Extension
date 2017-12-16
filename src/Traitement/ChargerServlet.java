package Traitement;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import BaseDeDonnee.Connexion;

/**
 * Servlet implementation class ChargerServlet
 */
public class ChargerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChargerServlet() {
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
		String email=request.getParameter("el");
		String doc=request.getParameter("doc");
		System.out.println("servlet charger"+doc+" "+email);
		
		Connection con=Connexion.getConnection();
		PreparedStatement ps;
		JsonArrayBuilder jsa = Json.createArrayBuilder();
		try {
			ps=con.prepareStatement("Select text from contenu c,documents d,users u where u.id=c.idUser and d.id=c.idDocument and urlDocument=? and email=?");
			ps.setString(1, doc);
			ps.setString(2, email);
			ResultSet rs=ps.executeQuery();
			while(rs.next()){
				System.out.println(rs.getString(1));
				JsonObjectBuilder j = Json.createObjectBuilder();
				j.add("text",rs.getString(1));
				jsa.add(j);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		JsonArray js = jsa.build();
		response.setContentType("application/json");
		PrintWriter p = response.getWriter();
		p.print(js);
		p.flush();
	}

}
