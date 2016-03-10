var jsCommentPages = function(){
  var $activePage,
		$activeTab,
		init = function(){	
			$(".comments-tab").each(function(){
				var $tab = $(this);
				$tab.click(selectPage)
					.addClass("js-inactive-tab");
				switch ($tab.attr("id")){
					case "blogger-comments": 
						$tab.prepend("<img src='https://4.bp.blogspot.com/-3CvAg0mqXTk/VuA0tjC8eII/AAAAAAAAAzc/XUn685lEN0M/s1600/blogger24x24.png'/>");
						break;
					case "disqus-comments":
						$tab.prepend("<img src='https://2.bp.blogspot.com/-lVcp2ySwVWg/VuAvqj4IMQI/AAAAAAAAAzA/p2YXXI5gOzs/s1600/24x24Disq1.png'/>");
						break;
					case "fb-comments":
						$tab.prepend("<img src='https://2.bp.blogspot.com/-pEjrwg3F_dw/VuAziG8w-TI/AAAAAAAAAzU/CNQijMFLEtQ/s1600/fb24x24.png'/>");
						break;
					case "gplus-comments":
						$tab.prepend("<img src='http://2.bp.blogspot.com/-oAGoAXHbA1s/UdVqbMTj5yI/AAAAAAAAENU/b0lZ9QaO0fc/s210/white-Google-Plus.png'/>");
						break;
						
				}
				$tab = null;
			});
						
			getTweetCounts();
			
			var $default = $("comments-tab:first"),
				strDefault = "#disqus-comments";
			if($default.length > 0){
				strDefault = "#" + $default.attr("id");
			}
			//Set default tab and page Active
			$activeTab = $(strDefault);
			$activeTab.removeClass("js-inactive-tab");
			
			$activePage = $(strDefault + "-page");			
			$activePage.show();
		},
		getTweetCounts = function(){
		  	$(".js-page-tweet-count").each(
				function(){
					var $count = $(this);
					$.getJSON("http://urls.api.twitter.com/1/urls/count.json?callback=?",
		      	{url: $count.attr("href")},
		         function(json){$count.text(json.count);$count = null;});					   	
				}
			);		   
 	 	},
		selectPage = function() {
			//Set old tab inactive, then set clicked tab active
		  	$activeTab.addClass("js-inactive-tab");
			$activeTab = $(this);
		  	$activeTab.removeClass("js-inactive-tab");
			
			//hide active page, then switch to page associated to clicked tab
		  	$activePage.hide();
		  	$activePage = $("#" + $activeTab.attr("id") + "-page");
		  	$activePage.show();
		};
	$("head").append("<link id='js-comments-pages-styles' rel='stylesheet' type='text/css' href='http://ragside.github.io/FBQstyles.css'/>");
  	$("document").ready(init);}();
