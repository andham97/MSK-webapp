/**
 * Created by andreashammer on 18/02/2017.
 */
var router = require('express').Router();

router.get('/add', function(req, res){
    var par = req.query;
    par.width = 100;
    par.height = 100;
    Create({badge: par}, function(err, badge){
        if(err){
            console.error(err);
            res.send(500, "Internal server error");
        }
        else {
            res.send(200, "Success");
        }
    });
});

router.get('/completed', function(req, res){
    var par = {};
    par._id = req.query.id;
    Load({badge: par}, function(err, trip){
        if(trip){
            if(!trip.completedBy){
                res.send(500, "Det oppsto et problem");
                return;
            }
            var p = trip.completedBy;
            var b = -1;
            for(var i = 0; i < p.length; i++){
                if(p[i] == req.cookies._id){
                    b = i;
                    break;
                }
            }
            if(b == -1)
                p.push(req.cookies._id);
            Update({badge: par}, {badge: {completedBy: p}}, function(err, trip){
                if(err){
                    res.send(500, "Det oppsto et problem");
                }
                else{
                    res.json({msg: "Success", add: b == -1});
                }
            });
        }
    });
});

module.exports = router;